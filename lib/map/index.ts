// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export interface MapPoint {
  id: number
  name: string
  description?: string
  latitude: number
  longitude: number
  created_at: string
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database functions
export const getMapPoints = async (): Promise<MapPoint[]> => {
  const { data, error } = await supabase
    .from('map_points')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching points:', error)
    return []
  }

  return data || []
}

export const addMapPoint = async (point: Omit<MapPoint, 'id' | 'created_at'>): Promise<MapPoint | null> => {
  const { data, error } = await supabase
    .from('map_points')
    .insert([point])
    .select()
    .single()

  if (error) {
    console.error('Error adding point:', error)
    return null
  }

  return data
}