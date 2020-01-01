const validate = values => {
  const errors = {};
  const { title, link, priority, imageVideo } = values;
  if (!title) {
    errors.title = "The title is required.";
  } else if (title.trim() && title.length > 30) {
    errors.title = "The title may not be greater than 30 characters.";
  }

  if (!link) {
    errors.link = "The link is required.";
  } else if (link.trim() && link.length > 255) {
    errors.link = "The link may not be greater than 255 characters.";
  }

  if (priority === null || priority === undefined || priority === "") {
    errors.priority = "The priority is required.";
  }

  if (imageVideo && imageVideo.size > 2048 * 1024) {
    errors.imageVideo = "The image cannot exceed 2MB size";
  }

  return errors;
};

export default validate;
