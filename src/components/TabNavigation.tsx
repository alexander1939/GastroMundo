import React from 'react';

export type TabType = 'map' | 'recipes' | 'events';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'map' as TabType, label: 'Buscar en Mapa', icon: '🗺️' },
    { id: 'recipes' as TabType, label: 'Recetas Tradicionales', icon: '👨‍🍳' },
    { id: 'events' as TabType, label: 'Eventos y Fiestas', icon: '🎉' }
  ];

  return (
    <div className="tab-navigation">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation; 