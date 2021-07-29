export default {
  welcome: 'Welcome',

  page: {
    back: 'Back',
  },

  general: {
    yes: 'Yes',
    no: 'No',

    follow: 'Follow',
    unfollow: 'Unfollow',
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
    required_label: '*required',
  },

  account: {
    manage: 'My Account',
    profile: 'My Profile',
    saved: 'Saved',
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
    people: 'People',
    person: {
      singular: 'Person',
      plural: 'People',
      default: 'person | people',
    },
    parties: 'Parties',
    party: {
      singular: 'Party',
      plural: 'Parties',
      default: 'party | parties',
    },
    products: 'Products',
    product: {
      singular: 'Product',
      plural: 'Products',
      default: 'product | products',
    },
    projects: 'Projects',
    project: {
      singular: 'Project',
      plural: 'Projects',
      default: 'project | projects',
    },
    collection: {
      singular: 'Collection',
      plural: 'Collections',
      default: 'collection | collections',
    },
    articles: 'Articles',
    article: {
      singular: 'Article',
      plural: 'Articles',
      default: 'article | articles',
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
        article: 'Article',
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
        article: {
          title: 'Articles',
          description: 'Articles written for this platform',
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
          loading: 'Preview is loading...',
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
            children: 'Underlying products',
            published_at: 'Published on',
          },
        },

        actions: {
          share: 'Share',
          bookmark: 'Save',
          bookmarked: 'Remove from saved',
          download: 'Download',
          visit: 'Visit',
        },
      },
      types: {
        video: 'Video',
        image: 'Image',
        youtube: 'YouTube',
        collection: 'Collection',
        document: 'Document',
        link: 'Link',
        empty: 'Empty',
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
            children: 'Underlying products',
            published_at: 'Published on',
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

      create: {
        headings: {
          metadata: 'Metadata',
        },
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
            themes: 'Themes',
            function: 'Function',
            phone: 'Phone',
          },
        },
        projects: {
          empty: 'This person has no projects yet.',
        },
        products: {
          empty: 'This person has no products yet.',
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

    likes: {
      no_results: 'No results found',
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

    article: {
      _id: {
        headings: {
          tags: 'Tags',
          themes: 'Themes',
        },
      },
    },
  },

  modals: {
    person: {
      create: {
        heading: 'You do not have a profile yet, would you like to create one?',
        cancel_text:
          "Don't want to create a profile yet? Continue to the platform",
      },
    },
  },
}
