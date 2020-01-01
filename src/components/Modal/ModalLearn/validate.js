const validate = values => {
  const errors = {};
  const { title, content, priority, imageLearn } = values;
  if (!title) {
    errors.title = "The title is required.";
  } else if (title.trim() && title.length > 100) {
    errors.title = "The title may not be greater than 100 characters.";
  }

  if (!content) {
    errors.content = "The link is required.";
  } else if (content.trim() && content.length > 5000) {
    errors.content = "The link may not be greater than 5000 characters.";
  }

  if (
    priority === null ||
    priority === undefined ||
    priority === ""
  ) {
    errors.priority = "The priority is required.";
  }

  if (imageLearn && imageLearn.size > 2048 * 1024) {
    errors.imageLearn = "The image cannot exceed 2MB size";
  }

  return errors;
};

export default validate;
