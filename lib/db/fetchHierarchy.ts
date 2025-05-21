import { pool } from "./pooler"

// Define types for our hierarchy
interface TreeNode {
	id: string
	name: string
	parent_id: number | null
	slug:string
	children?: TreeNode[]
}

interface FetchHierarchyOptions {
	tableName?: string
	filter?: string
	idField?: string
	parentIdField?: string
	orderBy?: string
	category_slug: string
}

/**
 * Fetch hierarchical data from PostgreSQL and convert to nested JSON structure
 *
 * @param options Configuration options
 * @returns Hierarchical data structure as an array of root nodes
 */
export async function fetchHierarchy(
	options: FetchHierarchyOptions
): Promise<TreeNode[]> {
	// Extract options with defaults
	const {
		tableName = "categories",
		filter,
		idField = "id",
		parentIdField = "previous_category_id",
		orderBy = idField,
		category_slug
	} = options

	// Create connection if not provided

	try {
		// Construct WHERE clause if filter provided
		const whereClause = filter ? `WHERE ${filter}` : ""

		// Get all rows from the specified table
		// Use parameterized query to avoid SQL injection
		const query = `SELECT * FROM ${tableName} WHERE main_category_id = (SELECT id FROM main_categories WHERE slug = $1);`
		const result = await pool.query(query, [category_slug])

		// Transform flat data into hierarchical structure
		return createHierarchy(result.rows, idField, parentIdField)
	} catch (error: any) {
		console.error("Database error:", error)
		throw new Error(`Error fetching hierarchical data: ${error.message}`)
	} finally {
		// Release connection if we created it
	}
}

/**
 * 
 * Transform flat data into a hierarchical structure
 *
 * @param rows Database rows
 * @param idField Field name containing the node ID
 * @param parentIdField Field name containing the parent ID
 * @returns Array of root nodes with nested children
 */
function createHierarchy(
	rows: any[],
	idField: string = "id",
	parentIdField: string = "parent_id"
): TreeNode[] {
	const nodes: { [key: number]: TreeNode } = {}
	const roots: TreeNode[] = []

	// First pass: Create all nodes
	rows.forEach((row) => {
		// Create a copy of the row with a children array
		nodes[row[idField]] = { ...row, children: [] }
	})

	// Second pass: Create parent-child relationships
	rows.forEach((row) => {
		const node = nodes[row[idField]]

		if (row[parentIdField] === null) {
			// This is a root node
			roots.push(node)
		} else if (nodes[row[parentIdField]]) {
			// This is a child node, add it to its parent's children array
			nodes[row[parentIdField]].children?.push(node)
		} else {
			// Parent not found, treat as root
			console.warn(
				`Parent ID ${row[parentIdField]} not found for node ${row[idField]}`
			)
			roots.push(node)
		}
	})

	return roots
}

export default fetchHierarchy
