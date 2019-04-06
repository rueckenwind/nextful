module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const { widgets } = fields;

  const cleanedWidgets = widgets.map((widget) => {
    return {
      id: widget.sys.id,
      padded: widget.fields.padded,
      content: widget.fields.content,
    };
  });

  return {
    id,
    widgets: cleanedWidgets,
  };
};
