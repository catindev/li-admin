export default [

  {
    title: 'Главная',
    id: 'home',
    url: '/home'
  },

  {
    title: "Редактирование",
    id: "edit",
    uri: '/edit',
    functions: [
      "blacklist",
      "prebox_ppc",
      "dlr_url",
      "corrman",
      "recalc",
      "smsed",
      "subscriptions",
      "prefed",
      "usermanagement",
      "operator_offer",
      "news",
      "users",
      "smsfm",
      "services_edit",
      "odnoklassniki_unsubscribe",
      "subscription",
    ]
  },

  {
    title: "Финансы",
    id: "finance",
    uri: "/finance",
    features: [

      {
        title: 'Тарифы на рассылки',
        id: 'tariff',
        uri: '/finance/tariff',
        features: [

          {
            title: 'Ком. предложение',
            id: 'proposal',
            uri: '/finance/tariff/proposal',
            endpoints: [
              { endpoint: 'bulk/tariff', methods: [ 'GET' ] },
            ]
          },

          {
            title: 'Тарифы партнёра',
            id: 'price',
            uri: '/finance/tariff/price',
            endpoints: [
              { endpoint: 'bulk/tariff', methods: [ 'GET' ] },
            ]
          }

        ]
      }

    ],
    functions: [
      "pay",
      "rev",
      "moneyback_single",
      "tarif",
      "manager.cgi",
      "wmpay",
      "inpay",
    ]
  },

  {
    title: "Поиск",
    id: "search",
    uri: "/search",
    features: [
      {
        title: 'Поиск по текстам СМС',
        id: 'sms',
        uri: '/search/sms',
        endpoints: [
          { endpoint: 'search/sms', methods: [ 'GET' ] },
        ]
      }
  
    ],
    functions: [
      "history_log",
      "phone_ppc_info",
      "grep",
      "fraud",
      "textsms",
      "find_sms",
    ]
  },

  {
    title: "Статистика",
    id: "stats",
    uri: "/stats",
    features: [
    
      {
        title: 'Отчёты по фроду',
        id: 'fraud',
        uri: '/stats/fraud',
        endpoints: [
          { endpoint: 'stats/fraud', methods: [ 'POST' ] },
        ]
      }
  
    ],
    functions: [
      "statistics",
      "stat",
      "prepayment",
      "unloading",
      "smsdyn",
      "bn.cgi",
      "conversion",
      "so_admin_gate_smsstat",
      "ppc_mo_stat",
      "otchet_po_rassylkam",
      "stat_delivery",
      "so_admin_bulk_smsstat",
    ]
  },

  {
    title: "Мониторинг",
    id: "monitoring",
    uri: "/monitoring",
    functions: [
      "send_sms",
      "statistics_alerter_whitelist",
      "opensmppbox_1",
      "send",
      "multiorders",
      "tailout",
    ]
  },

  {
    title: "SMS-шлюз",
    id: "sms",
    uri: "/sms",
    functions: [
      "kannel_1",
      "kannel_2",
      "bulk-kannel-1",
      "bulk-kannel-2",
      "kannel_config",
      "bg_sms_history",
      "tarify_rassylochnyh_shljuzov",
      "redaktor_rassylochnyh_pravil",
      "redaktor_rassylochnyh_shljuzov",
      "so_admin_bulk_history",
      "rules",
      "gates",
      "gate_tariff",
    ]
  },

  {
    title: "Платформа рассылок",
    id: "mplatform",
    uri: "/mplatform",
    functions: [
      "listbalances",
      "alpha_titles",
      "partners_notices",
    ]
  },

  {
    title: "Старое",
    id: "deprecated",
    uri: "/deprecated",
    functions: [
      "fraud_after_autocall",
      "frod",
      "rate_report",
      "so_admin_presms",
      "weekstat_pay",
      "mtzucp",
      "smsstat",
      "partners_list",
      "revenue_report",
      "trafficreport",
    ]
  },

];
