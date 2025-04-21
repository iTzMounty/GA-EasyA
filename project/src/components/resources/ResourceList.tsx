import React from 'react';
import ResourceCard from './ResourceCard';
import { Resource } from '../../types';

interface ResourceListProps {
  resources: Resource[];
  title?: string;
  emptyMessage?: string;
}

const ResourceList: React.FC<ResourceListProps> = ({ 
  resources, 
  title = "Resources", 
  emptyMessage = "No resources found" 
}) => {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
      
      {resources.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;