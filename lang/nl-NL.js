export default {
  welcome: 'Welkom',

  page: {
    back: 'Terug',
  },

  general: {
    follow: 'Volgen',
    skills: 'Skills',
  },

  account: {
    login: 'Inloggen',
    profile: 'Mijn Account',
  },

  entities: {
    type: {
      singular: 'Type',
      plural: 'Types',
      default: 'type | types',
    },
    theme: {
      singular: 'Thema',
      plural: "Thema's",
      default: "thema | thema's",
    },
    person: {
      singular: 'Persoon',
      plural: 'Personen',
      default: 'persoon | personen',
    },
    party: {
      singular: 'Partij',
      plural: 'Partijen',
      default: 'partij | partijen',
    },
    product: {
      singular: 'Product',
      plural: 'Producten',
      default: 'product | producten',
    },
    project: {
      singular: 'Project',
      plural: 'Projecten',
      default: 'project | projecten',
    },
  },

  filters: {
    show_more: 'Toon {number} meer',
    show_less: 'Toon minder',
    themes: {
      title: 'Thema',
    },
    types: {
      title: 'Type resultaat',
      labels: {
        party: 'Partij',
        product: 'Product',
        person: 'Persoon',
        project: 'Project',
      },
    },
  },

  pages: {
    index: {
      title: 'Samen creëren we impact!',
      subtitle: 'Kennis uit het hoger onderwijs in Nederland',
      find_by_theme: 'Vinden op thema',
      discover_heading: 'Ontdekken',
      statistics_title: 'Op dit platform',
      search_blocks: {
        title: 'Ik zoek',
        project: {
          title: 'Projecten',
          description:
            'Onderzoeksprojecten en programma’s met onderliggende producten',
        },
        product: {
          title: 'Producten',
          description:
            'Uitkomsten en resultaten van praktijkgerichte onderzoeken',
        },
        person: {
          title: 'Personen',
          description:
            'Mensen die betrokken zijn bij praktijkgericht onderzoek',
        },
        party: {
          title: 'Partijen',
          description:
            'Organisaties en instellingen die betrokken zijn bij praktijkgericht onderzoek ',
        },
      },
    },

    product_show: {
      share: 'Delen',
      bookmark: 'Opslaan',
      types: {
        video: 'video',
      },
    },

    project: {
      _id: {
        headings: {
          contact: 'Contactpersoon',
        },
        types: {
          project: 'Project',
          parties: 'Partijen',
          products: 'Producten',
          people: 'Personen',
        },
        no_result: 'Dit project heeft geen {entity}',
      },
    },

    person: {
      _id: {
        about: {
          title: 'Over',
        },
        profile: {
          identifier: 'Identifier',
          email: 'E-mail',
          phone: 'Telefoonnummer',
        },
      },
    },

    party: {
      _id: {
        about: {
          title: 'Over',
        },
        headings: {
          parties: 'Organisaties',
        },
      },
    },

    search: {
      title: 'Zoekresultaten',
      placeholder: 'Start je zoektocht...',
      no_results: 'Geen resultaten gevonden',
      input_search: 'Start je zoektocht...',

      items: {
        show_all: 'toon alles',
      },

      filters: {
        heading: 'Filters',
      },
    },

    login: {
      please_wait: 'Een moment geduld terwijl wij je proberen in te loggen',
    },
  },
}
