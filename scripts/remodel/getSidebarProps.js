module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const { content = null } = fields;

  return {
    id,
    content,
  };
};
