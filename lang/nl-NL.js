export default {
  welcome: 'Welkom',

  page: {
    back: 'Terug',
  },

  general: {
    yes: 'Ja',
    no: 'Nee',

    follow: 'Volgen',
    unfollow: 'Ontvolgen',
    skills: 'Skills',
    show_more: 'Toon {number} meer',
    show_less: 'Toon minder',
    save: 'Opslaan',
    cancel: 'Annuleren',
    management: 'Beheer',
    no_results: 'Geen resultaten',

    actions: {
      create: 'Aanmaken',

      confirm: {
        delete: {
          title: 'Weet je zeker dat je wilt verwijderen?',
          text: 'Dit is niet terug te draaien!',
          confirm_button: 'Ja, verwijder!',
          cancel_button: 'Annuleer',
          success_title: 'Verwijderd!',
          success_text: '{entity} is verwijderd.',
        },
      },
    },
  },

  actions: {
    create: 'Aanmaken',
  },

  validation: {
    required: 'Dit veld is verplicht',
    required_label: '*verplicht',
  },

  help_text: {
    image_upload: 'Gebruik een plaatje met zelfde hoogte en breedte',
  },

  account: {
    manage: 'Mijn Account',
    profile: 'Mijn Profiel',
    saved: 'Opgeslagen',
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
    people: 'Personen',
    person: {
      singular: 'Persoon',
      plural: 'Personen',
      default: 'persoon | personen',
    },
    parties: 'Partijen',
    party: {
      singular: 'Partij',
      plural: 'Partijen',
      default: 'partij | partijen',
    },
    products: 'Producten',
    product: {
      singular: 'Product',
      plural: 'Producten',
      default: 'product | producten',
    },
    projects: 'Projecten',
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
    articles: 'Artikelen',
    article: {
      singular: 'Artikel',
      plural: 'Artikelen',
      default: 'artikel | artikelen',
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
        article: 'Artikel',
      },
    },
  },

  pages: {
    index: {
      title: 'Samen cre??ren we impact!',
      subtitle: 'Kennis uit het hoger onderwijs in Nederland',
      find_by_theme: 'Vinden op thema',
      discover_heading: 'Ontdekken',
      statistics_title: 'Op dit platform',
      search_blocks: {
        title: 'Ik zoek',
        project: {
          title: 'Projecten',
          description:
            'Onderzoeksprojecten en programma???s met onderliggende producten',
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
        article: {
          title: 'Artikelen',
          description: 'Artikelen die zijn geschreven voor dit platform',
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
          keywords: 'Trefwoorden',
          themes: "Thema's",
          more_products: 'Meer producten',
        },
        preview: {
          fallback:
            'Sorry, het was voor ons niet mogelijk om dit product te previewen',
          loading: 'Preview wordt geladen...',
        },
        actions: {
          share: 'Delen',
          bookmark: 'Opslaan',
          bookmarked: 'Verwijder uit opgeslagen',
          download: 'Download',
          visit: 'Bezoeken',
        },
        edit: {
          title: 'Bewerk {name}',
          headings: {
            metadata: 'Metadata',
          },
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
          people: 'Auteurs',
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
            function: 'Functie',
            phone: 'Telefoonnummer',
          },
        },
        projects: {
          empty: 'Deze persoon heeft nog geen projecten.',
        },
        products: {
          empty: 'Deze persoon heeft nog geen producten.',
        },
      },

      create: {
        labels: {
          first_name: 'Voornaam',
          profile_picture: 'Profiel foto',
          last_name: 'Achternaam',
          about: 'Over',
          skills: 'Skills',
          themes: "Thema's",
          function: 'Functie',
          phone: 'Telefoonnummer',
          email: 'E-mail',
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

    likes: {
      no_results: 'Geen resultaten gevonden',
    },

    search: {
      title: 'Zoekresultaten',
      placeholder: 'Start je zoektocht...',
      no_results: 'Geen resultaten gevonden',
      input_search: 'Start je zoektocht...',
      depleted: "That's all folks!",

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
          related_projects: 'Gerelateerde projecten',
          related_products: 'Gerelateerde producten',
        },
      },
    },

    management: {
      keywords: {
        index: {
          heading: 'Trefwoorden',
        },
        create: {
          heading: 'Trefwoord aanmaken',
        },
        _id: {
          edit: {
            heading: 'Trefwoord aanpassen',
          },
        },
      },

      themes: {
        index: {
          heading: "Thema's",
        },
        create: {
          heading: 'Thema aanmaken',
        },
        _id: {
          edit: {
            heading: 'Thema aanpassen',
          },
        },
      },

      parties: {
        index: {
          heading: 'Partijen',
        },
        create: {
          heading: 'Partij aanmaken',
        },
        _id: {
          edit: {
            heading: 'Partij aanpassen',
          },
        },
      },

      users: {
        index: {
          heading: 'Gebruikers',
          table_fields: {
            identifier: 'identifier',
            name: 'Naam',
            email: 'E-mail',
          },
        },

        create: {
          heading: 'Gebruiker aanmaken',
        },

        _id: {
          edit: {
            heading: 'Gebruiker bewerken',
          },
        },
      },
    },
  },

  modals: {
    person: {
      create: {
        heading: 'Je hebt nog geen profiel, wil je die aanmaken?',
        cancel_text: 'Nu geen profiel aanmaken? Ga door naar het platform',
      },
    },

    general: {
      unauthenticated: {
        title: 'Niet ingelogd',
        text: 'Het lijkt erop of je niet bent ingelogd op dit moment.',
      },
      unauthorized: {
        title: 'Niet gemachtigd',
        text: 'Je bent niet gemachtigd om deze actie te doen.',
      },

      create: {
        success: {
          title: 'Succesvol aangemaakt',
          text: '{entity} is succesvol aangemaakt.',
        },
      },
      edit: {
        success: {
          title: 'Succesvol aangepast',
          text: '{entity} is succesvol aangepast.',
        },
      },
      delete: {
        success: {
          title: 'Verwijderd',
          text: '{entity} is succesvol verwijderd.',
        },
      },
    },
  },

  models: {
    theme: {
      labels: {
        id: 'Identifier',
        label: 'Label',
      },
      actions: {
        transform: 'Transformeer een thema in een trefwoord',
      },
    },

    party: {
      labels: {
        id: 'Identifier',
        name: 'Naam',
        description: 'Beschrijving / Over',
        profilePicture: 'Profielfoto',
      },
    },

    keyword: {
      labels: {
        id: 'Identifier',
        label: 'Label',
      },
    },

    user: {
      labels: {
        id: 'Identifier',
        email: 'Email',
      },
      relationships: {
        roles: 'Rollen',
      },
    },
  },
}
