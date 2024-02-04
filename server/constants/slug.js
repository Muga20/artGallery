const createNameSlug = (name, counter = 1) => {
  let slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();

  if (counter > 1) {
    slug = `${slug}-${counter}`; // Append the counter to the slug
  }

  return slug;
};

module.exports = {
  createNameSlug,
};
