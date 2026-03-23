export const navGroups = [
  {
    title: "Getting Started",
    items: [
      { id: 'overview', label: 'Project Overview', href: '/' },
    ]
  },
  {
    title: "Role-Based Manuals",
    items: [
      { id: 'manual-dev', label: 'Developer Guide', href: '/manual-dev' },
      { id: 'manual-user', label: 'Customer (User) Guide', href: '/manual-user' },
      { id: 'manual-admin', label: 'Staff (Admin) Guide', href: '/manual-admin' },
      { id: 'manual-owner', label: 'Venue Owner Guide', href: '/manual-owner' },
    ]
  },
  {
    title: "Core Architecture",
    items: [
      { id: 'architecture', label: 'System Architecture', href: '/architecture' },
      { id: 'tech-stack', label: 'Technology Stack', href: '/tech-stack' },
      { id: 'database', label: 'Database Schema', href: '/database' },
    ]
  },
  {
    title: "Capabilities",
    items: [
      { id: 'features', label: 'Enterprise Features', href: '/features' },
    ]
  },
  {
    title: "Developers",
    items: [
      { id: 'api-reference', label: 'API Reference', href: '/api-reference' },
    ]
  },
  {
    title: "Roadmap & FAQ",
    items: [
      { id: 'roadmap', label: 'Ecosystem Roadmap', href: '/roadmap' },
      { id: 'faq', label: 'Frequently Asked Questions', href: '/faq' },
    ]
  }
];

export const flattenedNav = navGroups.flatMap(group => 
  group.items.map(item => ({ ...item, groupTitle: group.title }))
);
