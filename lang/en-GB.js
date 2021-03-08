export default {
  welcome: 'Welcome',

  page: {
    back: 'Back',
  },

  general: {
    follow: 'Follow',
    skills: 'Skills',
    show_more: 'Show {number} more',
    show_less: 'Show less',
    save: 'Save',
  },

  validation: {
    required: 'This field is required',
  },

  account: {
    login: 'Login',
    profile: 'My account',
  },

  entities: {
    type: {
      singular: 'Type',
      plural: 'Types',
      default: 'type | types',
    },
    theme: {
      singular: 'Theme',
      plural: 'Themes',
      default: 'theme | themes',
    },
    person: {
      singular: 'Person',
      plural: 'People',
      default: 'person | people',
    },
    party: {
      singular: 'Party',
      plural: 'Parties',
      default: 'party | parties',
    },
    product: {
      singular: 'Product',
      plural: 'Products',
      default: 'product | products',
    },
    project: {
      singular: 'Project',
      plural: 'Projects',
      default: 'project | projects',
    },
  },

  filters: {
    themes: {
      title: 'Theme',
    },
    types: {
      title: 'Type of result',
      labels: {
        party: 'Party',
        product: 'Product',
        person: 'Person',
        project: 'Project',
      },
    },
  },

  pages: {
    index: {
      title: 'Together we create impact!',
      subtitle: 'Knowledge from higher education in the Netherlands',
      find_by_theme: 'Find by theme',
      discover_heading: 'Discover',
      statistics_title: 'On this platform',
      search_blocks: {
        title: "I'm looking for",
        project: {
          title: 'Projects',
          description:
            'Research projects and programs with underlying products',
        },
        product: {
          title: 'Products',
          description: 'Outcomes and results of practice-oriented studies',
        },
        person: {
          title: 'People',
          description: 'People involved in practice-oriented research',
        },
        party: {
          title: 'Parties',
          description:
            'Organizations and institutions involved in practice-oriented research',
        },
      },
    },

    product_show: {
      share: 'Share',
      bookmark: 'Save',
      types: {
        video: 'video',
      },
    },

    project: {
      _id: {
        headings: {
          contact: 'Contact',
          people: 'People',
          parties: 'Parties',
          description: 'Description',
          purpose: 'Purpose of the project',
          tags: 'Keywords',
          themes: 'Themes',
        },
        types: {
          project: 'Project',
          parties: 'Parties',
          products: 'Products',
          people: 'People',
        },
        no_result: 'This project has no {entity}',
      },
    },

    person: {
      _id: {
        about: {
          title: 'About',
        },
        profile: {
          identifier: 'Identifier',
          email: 'E-mail',
          phone: 'Phone',
        },
        edit: {
          title: 'Edit {name}',
          labels: {
            first_name: 'First name',
            last_name: 'Last name',
            about: 'About',
          },
        },
      },
    },

    party: {
      _id: {
        about: {
          title: 'About',
        },
        headings: {
          parties: 'Organisations',
        },
      },
    },

    search: {
      title: 'Search results',
      placeholder: 'Start your search...',
      no_results: 'No products found',
      input_search: 'Start your search...',

      items: {
        show_all: 'show all',
      },

      filters: {
        heading: 'Filters',
      },
    },

    login: {
      please_wait: 'Please wait while we try to log you in',
    },
  },
}
