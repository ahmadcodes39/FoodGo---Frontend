// Utility to group items by category
export const groupByCategory = (menuItems) => {
  return menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};
 