export default {
  welcome: 'Welkom',

  page: {
    back: 'Terug',
  },

  general: {
    yes: 'Ja',
    no: 'Nee',

    follow: 'Volgen',
    skills: 'Skills',
    show_more: 'Toon {number} meer',
    show_less: 'Toon minder',
    save: 'Opslaan',

    actions: {
      create: 'Aanmaken',
    },
  },

  actions: {
    create: 'Aanmaken',
  },

  validation: {
    required: 'Dit veld is verplicht',
    required_label: '*verplicht',
  },

  account: {
    manage: 'Mijn Account',
    profile: 'Mijn Profiel',
  },

  auth: {
    actions: {
      login: 'Inloggen',
      logout: 'Uitloggen',
    },
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
    collection: {
      singular: 'Collectie',
      plural: 'Collecties',
      default: 'collectie | collecties',
    },
  },

  filters: {
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

    product: {
      _id: {
        headings: {
          facts: 'Korte feiten',
          contact: 'Contactpersoon',
          people: 'Personen',
          parties: 'Partijen',
          part_of: 'Onderdeel van',
          summary: 'Samenvatting',
          description: 'Beschrijving',
          tags: 'Trefwoorden',
          themes: "Thema's",
          more_products: 'Meer producten',
        },
        preview: {
          fallback:
            'Sorry, het was voor ons niet mogelijk om dit product te previewen',
        },
        actions: {
          share: 'Delen',
          bookmark: 'Opslaan',
          download: 'Download',
        },
        edit: {
          title: 'Bewerk {name}',
          labels: {
            type: 'Type',
            title: 'Titel',
            summary: 'Samenvatting',
            description: 'Beschrijving',
            file: 'Bestand',
            tags: 'Tags',
            themes: "Thema's",
            people: 'Auteurs',
            parties: 'Partijen',
            children: 'Onderliggende producten',
            published_at: 'Gepubliceerd op',
          },
        },
      },
      create: {
        headings: {
          create: 'Product aanmaken',
        },
        form: {
          labels: {
            type: 'Type',
            external: 'Extern',
            link: 'Link',
            title: 'Titel',
            summary: 'Samenvatting',
            description: 'Beschrijving',
            file: 'Bestand',
            tags: 'Tags',
            themes: "Thema's",
            people: 'Auteurs',
            parties: 'Partijen',
            children: 'Onderliggende producten',
            published_at: 'Gepubliceerd op',
          },
        },
      },
      types: {
        video: 'Video',
        image: 'Afbeelding',
        youtube: 'YouTube',
        collection: 'Collectie',
        document: 'Document',
        link: 'Link',
        empty: 'Leeg',
      },
    },

    project: {
      _id: {
        headings: {
          contact: 'Contactpersoon',
          people: 'Personen',
          parties: 'Partijen',
          description: 'Beschrijving',
          purpose: 'Doel van project',
          featured_products: 'Uitgelichte producten',
          tags: 'Trefwoorden',
          themes: "Thema's",
        },
        types: {
          project: 'Project',
          parties: 'Partijen',
          products: 'Producten',
          people: 'Personen',
        },
        no_result: 'Dit project heeft geen {entity}',
      },

      create: {
        headings: {
          metadata: 'Metadata',
        },
      },

      form: {
        headings: {
          create: 'Aanmaken project',
          edit: 'Bewerk {name}',
        },
        labels: {
          project_picture: 'Project foto',
          title: 'Titel',
          description: 'Beschrijving',
          purpose: 'Doel van project',
          parties: 'Partijen',
          products: 'Producten',
        },
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
        edit: {
          title: 'Bewerk {name}',
          headings: {
            metadata: 'Metadata',
          },
          labels: {
            first_name: 'Voornaam',
            profile_picture: 'Profiel foto',
            last_name: 'Achternaam',
            about: 'Over',
            skills: 'Skills',
            themes: "Thema's",
          },
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

    logout: {
      please_wait: 'Een moment geduld terwijl wij je proberen uit te loggen',
    },

    error: {
      403: 'Je hebt geen toegang tot deze pagina',
      404: 'Deze pagina bestaat niet',
      500: 'Er heeft zich een onverwachte fout voorgedaan',
      back_to_homepage: 'Ga terug naar de homepagina',
    },

    article: {
      _id: {
        headings: {
          tags: 'Tags',
          themes: "Thema's",
        },
      },
    },
  },
}
