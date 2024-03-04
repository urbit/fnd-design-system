import React from "react";

export const TabContext = React.createContext();

const Tabs = ({ labels, children }) => {
  const [currentTab, setCurrentTab] = React.useState(labels[0]);

  return (
    <TabContext.Provider value={currentTab}>
      <ul className="flex items-center cursor-pointer space-x-4 overflow-x-auto">
        {labels.map((label) => (
          <li
            className={
              "btn " +
              (currentTab === label ? "bg-gray text-brite" : "btn-light")
            }
            key={label}
            onClick={() => setCurrentTab(label)}
          >
            {label}
          </li>
        ))}
      </ul>
      {children}
    </TabContext.Provider>
  );
};

export default Tabs;
