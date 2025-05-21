import { TablesUpdate } from "@/lib/supabase/db.types";

/**
 * Updates a CMS item by sending data to the PATCH endpoint
 * 
 * @param updateData The data to update the CMS item with
 * @returns Promise with the response data
 */
export async function updateCmsItem(updateData: TablesUpdate<"cms_items">): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await fetch('/api/v1/cms_item', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update CMS item:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

