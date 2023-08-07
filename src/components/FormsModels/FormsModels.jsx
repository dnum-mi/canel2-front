/* 
    File which contains constants :
    - The fields name and the input type
    - The fields name and the label
*/

/*
    Acteur model
*/
export const ACTEUR_INPUT_TYPES = {
    'actif_acteur':'checkbox',
    'bureau_rattachement':'text',
    'email_acteur':'text',
    'entite_rattachement':'text',
    'habilitation_souscription':'checkbox',
    'nom_acteur':'text',
    'rio_acteur':'text',
    'type_acteur':'select'
};

export const ACTEUR_LABEL = {
    'actif_acteur':'Acteur actif',
    'bureau_rattachement':'Bureau de rattachement',
    'email_acteur':"Email de l'acteur",
    'entite_rattachement':'Entite de rattachement',
    'habilitation_souscription':'Habilitation de souscription',
    'nom_acteur':"Nom de l'acteur",
    'rio_acteur':'Rio acteur',
    'type_acteur':"Type de l'acteur"
};

export const ACTEUR_SELECT_ROUTES = {
    'type_acteur': 'type_acteur/'
}

/*
    Application model
*/
export const APPLICATION_INPUT_TYPES = {
    'application_statut': 'select',
    'bai2': 'text',
    'canel_id': 'text',
    'code_operation': 'text',
    'createur': 'text',
    'date_mise_en_production': 'date',
    'date_validite': 'date',
    'description': 'text',
    'gsp2_id': 'text',
    'ministere_responsable': 'select',
    'nom_application': 'text',
    'nom_parent': 'text',
    'organisation_projet': 'select',
    'pai': 'text',
    'parent_id': 'uuid',
    'sensibilite': 'select',
    'type': 'select',
    'url_public': 'url',
    'zone_urbanisation': 'select',
    'acteurs': 'text',
    'conformite': 'select',
    'devops': 'select',
    'environnements': 'text'
};

export const APPLICATION_LABEL = {
    'application_statut': "Statut de l'application",
    'bai2': 'BAI2',
    'canel_id': 'ID Canel',
    'code_operation': 'Code opération',
    'createur': 'Créateur',
    'date_mise_en_production': 'Date de mise en production',
    'date_validite': 'Date de validité',
    'description': 'Description',
    'gsp2_id': 'Id GSP2',
    'ministere_responsable': 'Ministère responsable',
    'nom_application': "Nom de l'application",
    'nom_parent': 'Nom du parent',
    'organisation_projet': 'Organisation du projet',
    'pai': 'PAI',
    'parent_id': 'Id du parent (uuid)',
    'sensibilite': 'Sensibilité',
    'type': 'Type',
    'url_public': 'Url public',
    'zone_urbanisation': 'Zone urbanisation',
    'acteurs': 'Acteur(s)',
    'conformite': 'Conformité',
    'devops': 'Devops',
    'environnements': 'Environnements(s)'
};

export const APPLICATIONS_SELECT_ROUTES = {
    'application_statut': '',
    'ministere_responsable': 'ministere/',
    'organisation_projet': 'organisation/',
    'sensibilite': 'sensibilite/',
    'zone_urbanisation': 'zone_urbanisation/',
    'conformite': 'conformites/',
    'devops': 'devops/'
}

/*
    Conformite model
*/
export const CONFORMITE_INPUT_TYPES = {
    'audit_passi_date':'date',
    'audit_passi_resultat':'text',
    'date_homologation':'date',
    'dsfr_conformite_niveau':'select',
    'dsfr_conformite_statut':'select',
    'homologation_jusque':'date',
    'homologation_plan_remediation':'checkbox',
    'rgaa_conformite_derogation':'checkbox',
    'rgaa_conformite_exemption':'checkbox',
    'rgaa_conformite_niveau':'select',
    'rgaa_conformite_statut':'select',
    'rgpd_conformite':'checkbox',
    'rgpd_conformite_accord':'checkbox',
    'rgpd_conformite_cnil_declaration':'checkbox',
    'rgpd_conformite_cnil_declaration_reference':'text',
    'rgpd_registre_conformite':'checkbox',
    'statut_conformite_rgs_rgi':'select',
    'statut_plan_homologation_remediation':'select'
};

export const CONFORMITE_LABEL = {
    'audit_passi_date':'Date audit passi',
    'audit_passi_resultat':'Résultat audit passi',
    'date_homologation':"Date d'homologation",
    'dsfr_conformite_niveau':'DSFR niveau de conformité',
    'dsfr_conformite_statut':'DSFR statut de conformité',
    'homologation_jusque':'Homologation jusque',
    'homologation_plan_remediation':'Homologation plan de remediation',
    'rgaa_conformite_derogation':'RGAA conformité dérogation',
    'rgaa_conformite_exemption':'RGAA conformité exemption',
    'rgaa_conformite_niveau':'RGAA conformité niveau',
    'rgaa_conformite_statut':'RGAA conformité statut',
    'rgpd_conformite':'RGPD conformité',
    'rgpd_conformite_accord':'RGPD conformité accord',
    'rgpd_conformite_cnil_declaration':'RGPD conformité CNIL déclaration',
    'rgpd_conformite_cnil_declaration_reference':'RGPD conformité CNIL déclaration référence',
    'rgpd_registre_conformite':'RGPD registre conformité',
    'statut_conformite_rgs_rgi':'Statut de conformité RGS RGI',
    'statut_plan_homologation_remediation':'Statut du plan homologation remediation'
};

/*
    Devops model
*/
export const DEVOPS_INPUT_TYPES = {
    'type_forge':'select',
    'utilise_argo':'checkbox',
    'utilise_cli':'checkbox',
    'utilise_devsecops':'checkbox',
    'utilise_gitlab':'checkbox',
    'utilise_nexus':'checkbox',
    'utilise_quay':'checkbox',
    'utilise_runner':'checkbox',
    'utilise_sonarQube':'checkbox',
    'utilise_vault':'checkbox'
};

export const DEVOPS_LABEL = {
    'type_forge':'Type forge',
    'utilise_argo':'Utilise Argo',
    'utilise_cli':'Utilise CLI',
    'utilise_devsecops':'Utilise Devsecops',
    'utilise_gitlab':'Utilise Gitlab',
    'utilise_nexus':'Utilise Nexus',
    'utilise_quay':'Utilise Quay',
    'utilise_runner':'Utiise Runner',
    'utilise_sonarQube':'Utilise SonarQube',
    'utilise_vault':'Utilise Vault'
};

/*
    Environnement model
*/
export const ENVIRONNEMENT_INPUT_TYPES = {
    'archivee':'checkbox',
    'cloud_hebergeur':'select',
    'environnnement':'text',
    'FIP':'text',
    'interface_id':'text',
    'migration':'select',
    'technologie':'multiselect',
    'tenant':'text',
    'type_hebergement':'select',
    'url':'text'
}; 

export const ENVIRONNEMENT_LABEL = {
    'archivee':'Archivé',
    'cloud_hebergeur':'Cloud hébergeur',
    'environnnement':'Environnement',
    'FIP':'FIP',
    'interface_id':'ID interface',
    'migration':'Migration',
    'technologie':'Technologie',
    'tenant':'Tenant',
    'type_hebergement':"Type d'hébergement",
    'url':'URL'
}; 

/*
    Interface model
*/
export const INTERFACE_INPUT_TYPES = {
    'application':'select',
    'frequence':'select',
    'interface_avec':'uuid',
    'nom_interface':'text',
    'type_flux':'select'
};

export const INTERFACE_LABEL = {
    'application':'Application',
    'frequence':'Fréquence',
    'interface_avec':'Interface avec (uuid)',
    'nom_interface':"Nom de l'interface",
    'type_flux':'Type de flux'
};

/*
    Migration model
*/
export const MIGRATION_INPUT_TYPES = {
    'commentaire':'text',
    'nombre_iteration_migration':'text',
    'scenario_migration':'select',
    'statut_migration':'text',
    'tenant_gen2':'text'
};

export const MIGRATION_LABEL = {
    'commentaire':'Commentaire',
    'nombre_iteration_migration':'Nombre iteration',
    'scenario_migration':'Scénario de migration',
    'statut_migration':'Statut de la migration',
    'tenant_gen2':'Tenant gen2'
};

/*
    Technologie model
*/
export const TECHNOLOGIE_INPUT_TYPES = {
    'composant_technologique':'text',
    'version':'text'
};

export const TECHNOLOGIE_LABEL = {
    'composant_technologique':'Composant technologique',
    'version':'Version'
};