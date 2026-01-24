export  interface member {
  id: string
  dateOfBrith: string
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
