import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Presentation, Code, File } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'lesson':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'slides':
        return <Presentation className="h-6 w-6 text-green-500" />;
      case 'hackathon':
        return <Code className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <CardTitle className="text-lg">{resource.title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-500 capitalize">
          {resource.type} Resource
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary" size="sm" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={resource.url} className="w-full">
          <Button className="w-full">
            View Resource
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;