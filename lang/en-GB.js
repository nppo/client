export default {
  welcome: 'Welcome',

  page: {
    back: 'Back',
  },

  general: {
    yes: 'Yes',
    no: 'No',

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
    manage: 'My Account',
    profile: 'My Profile',
  },

  auth: {
    actions: {
      login: 'Login',
      logout: 'Logout',
    },
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
          more_products: 'More products',
        },

        preview: {
          fallback: 'Sorry, we were not able to preview this product',
        },

        edit: {
          title: 'Edit {name}',
          headings: {
            metadata: 'Metadata',
          },
          labels: {
            type: 'Type',
            title: 'Title',
            summary: 'Summary',
            description: 'Description',
            file: 'File',
            tags: 'Tags',
            themes: 'Themes',
            people: 'Authors',
            parties: 'Parties',
          },
        },

        actions: {
          share: 'Share',
          bookmark: 'Save',
          download: 'Download',
        },
      },
      types: {
        video: 'Video',
        image: 'Image',
        youtube: 'YouTube',
      },

      create: {
        headings: {
          create: 'Create a new product',
        },
        form: {
          labels: {
            type: 'Type',
            title: 'Title',
            summary: 'Summary',
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
          featured_products: 'Featured products',
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
      form: {
        headings: {
          create: 'Create project',
          edit: 'Edit {name}',
        },
        labels: {
          project_picture: 'Project picture',
          title: 'Title',
          description: 'Description',
          purpose: 'Purpose of the project',
          parties: 'Parties',
          products: 'Products',
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
            profile_picture: 'Profile foto',
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

    logout: {
      please_wait: 'Please wait while we try to log you out',
    },

    error: {
      403: 'You are not authorized to view this page',
      404: 'This page does not exist',
      500: 'An unexpected error has occurred',
      back_to_homepage: 'Go back to the home page',
    },
  },
}
