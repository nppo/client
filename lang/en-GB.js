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
    actions: {
      create: 'Create',
    },
  },

  actions: {
    create: 'Create',
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

    product: {
      _id: {
        headings: {
          facts: 'Quickfacts',
          contact: 'Contact',
          people: 'People',
          parties: 'Parties',
          part_of: 'Part of',
          summary: 'Summary',
          description: 'Description',
          tags: 'Keywords',
          themes: 'Themes',
        },

        edit: {
          title: 'Edit {name}',
          labels: {
            title: 'Title',
            description: 'Description',
          },
        },

        actions: {
          share: 'Share',
          bookmark: 'Save',
        },
      },
      types: {
        video: 'video',
      },

      create: {
        headings: {
          create: 'Create a new product',
        },
        form: {
          labels: {
            type: 'Type',
            title: 'Title',
            description: 'Description',
            file: 'File',
            tags: 'Tags',
            themes: 'Themes',
            people: 'Authors',
            parties: 'Parties',
          },
        },
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
          recent_products: 'Recent products',
          tags: 'Keywords',
          themes: 'Themes',
        },
        types: {
          project: 'Project',
          parties: 'Parties',
          products: 'Products',
          people: 'People',
        },
        edit: {
          title: 'Edit {name}',
          labels: {
            title: 'Title',
            description: 'Description',
            purpose: 'Purpose of the project',
            parties: 'Partijen',
          },
        },
        no_result: 'This project has no {entity}',
      },
      form: {
        headings: {
          create: 'Create project',
          edit: 'Edit {name}',
        },
        labels: {
          title: 'Title',
          description: 'Description',
          purpose: 'Purpose of the project',
        },
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
            profile_picture: 'Profiel foto',
            last_name: 'Last name',
            about: 'About',
            skills: 'Skills',
            themes: 'themes',
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

    error: {
      403: 'You are not authorized to view this page',
      404: 'This page does not exist',
      500: 'An unexpected error has occurred',
      back_to_homepage: 'Go back to the home page',
    },
  },
}
