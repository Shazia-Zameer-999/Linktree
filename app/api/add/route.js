import { getProfilesCollection } from "@/lib/profiles"
import { ProfileValidationError, validateProfile } from "@/lib/profile-validation"

const MAX_REQUEST_BYTES = 3_200_000

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0)
    if (contentLength > MAX_REQUEST_BYTES) {
      return Response.json(
        { success: false, error: true, message: "The submitted profile is too large." },
        { status: 413 },
      )
    }

    let body
    try {
      body = await request.json()
    } catch {
      return Response.json(
        { success: false, error: true, message: "The request body must be valid JSON." },
        { status: 400 },
      )
    }

    const profile = validateProfile(body)
    const collection = await getProfilesCollection()
    await collection.insertOne(profile)

    return Response.json(
      { success: true, error: false, message: "Your Linktree has been generated.", handle: profile.handle },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof ProfileValidationError) {
      return Response.json(
        { success: false, error: true, message: error.message },
        { status: error.status },
      )
    }

    if (error?.code === 11000) {
      return Response.json(
        { success: false, error: true, message: "Handle already exists. Please choose a different handle." },
        { status: 409 },
      )
    }

    console.error("Profile creation failed:", error)
    return Response.json(
      { success: false, error: true, message: "The profile could not be created." },
      { status: 500 },
    )
  }
}
