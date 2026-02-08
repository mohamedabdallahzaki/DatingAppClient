export  interface member {
  id:string
  dateOfBirth:string
  displayName: string
  createAt: string
  lastActive: string
  imageUrl: string
  gender: string
  description?: string
  city: string
  country: string
}
export interface photo {
  id: number
  imageUrl: string
  publicId: any
  memberId: string
  member: any
}
export type EditableMember = {
  displayName: string | undefined
  description?: string
  city: string
  country: string
}
