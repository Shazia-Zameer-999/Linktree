const HANDLE_PATTERN = /^[a-z0-9_-]{1,30}$/
const RESERVED_HANDLES = new Set(["api", "admin", "generate", "login", "signup"])
const MAX_IMAGE_BYTES = 2 * 1024 * 1024

export class ProfileValidationError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = "ProfileValidationError"
    this.status = status
  }
}

export function normalizeHandle(value) {
  return String(value ?? "").trim().replace(/^@/, "").toLowerCase()
}

function normalizeHttpUrl(value, fieldName) {
  const input = String(value ?? "").trim()

  if (!input || input.length > 2048) {
    throw new ProfileValidationError(`${fieldName} must be between 1 and 2048 characters.`)
  }

  const candidate = input.startsWith("//")
    ? `https:${input}`
    : /^[a-z][a-z0-9+.-]*:/i.test(input)
      ? input
      : `https://${input}`

  let url
  try {
    url = new URL(candidate)
  } catch {
    throw new ProfileValidationError(`${fieldName} must be a valid web address.`)
  }

  if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password) {
    throw new ProfileValidationError(`${fieldName} must use a public http:// or https:// address.`)
  }

  return url.toString()
}

function validateProfilePicture(value) {
  const picture = String(value ?? "").trim()
  if (!picture) return ""

  if (picture.startsWith("data:")) {
    const match = picture.match(/^data:image\/(png|jpe?g|webp|gif);base64,([a-z0-9+/=]+)$/i)
    if (!match) {
      throw new ProfileValidationError("Uploaded pictures must be PNG, JPG, WebP, or GIF images.")
    }

    const padding = match[2].endsWith("==") ? 2 : match[2].endsWith("=") ? 1 : 0
    const byteLength = Math.floor((match[2].length * 3) / 4) - padding
    if (byteLength > MAX_IMAGE_BYTES) {
      throw new ProfileValidationError("The profile picture must be 2 MB or smaller.", 413)
    }

    return picture
  }

  return normalizeHttpUrl(picture, "Profile picture")
}

export function validateProfile(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ProfileValidationError("A valid profile payload is required.")
  }

  const handle = normalizeHandle(input.handle)
  if (!HANDLE_PATTERN.test(handle)) {
    throw new ProfileValidationError("Handle must be 1-30 characters using letters, numbers, underscores, or hyphens.")
  }
  if (RESERVED_HANDLES.has(handle)) {
    throw new ProfileValidationError("That handle is reserved. Please choose another one.", 409)
  }

  const bio = String(input.bio ?? "").trim()
  if (bio.length > 160) {
    throw new ProfileValidationError("Bio must be 160 characters or fewer.")
  }

  if (!Array.isArray(input.links) || input.links.length < 1 || input.links.length > 20) {
    throw new ProfileValidationError("Add between 1 and 20 complete links.")
  }

  const links = input.links.map((link, index) => {
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      throw new ProfileValidationError(`Link ${index + 1} is invalid.`)
    }

    const linktext = String(link.linktext ?? "").trim()
    if (!linktext || linktext.length > 80) {
      throw new ProfileValidationError(`Link ${index + 1} title must be between 1 and 80 characters.`)
    }

    return {
      linktext,
      link: normalizeHttpUrl(link.link, `Link ${index + 1}`),
    }
  })

  return {
    handle,
    bio,
    pic: validateProfilePicture(input.pic),
    links,
    createdAt: new Date(),
  }
}
