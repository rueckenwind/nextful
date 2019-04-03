module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const { widgets } = fields;

  const cleanedWidgets = widgets.map((widget) => {
    console.log(widget.fields.content);
    return {
      padded: widget.fields.padded,
      content: widget.fields.content,
    };
  });

  return {
    id,
    widgets: cleanedWidgets,
  };
};
