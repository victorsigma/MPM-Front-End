export class Lang {
    // Textos de la página de inicio
    home_title: string = '';
    home_slogan: string = '';
    home_register: string = '';
    home_login: string = '';
    home_create_projects: string = '';
    home_create_team_project_tool: string = '';
    home_create_several_projects: string = '';
    home_create_activities: string = '';
    home_modify_project: string = '';
    home_make_changes_modify_project: string = '';
    home_add_remove_members: string = '';
    home_add_remove_project_members: string = '';
    home_change_activity_elements: string = '';
    home_edit_activity_elements: string = '';

    // Textos del pie de pagina
    footer_about_us: string = '';
    footer_back_to_up: string = '';

    // Títulos de las rutas
    projects: string = '';
    activities: string = '';
    pather_home: string = '';
    pather_projects: string = '';
    pather_all: string = '';
    pather_unassigned: string = '';
    pather_in_progress: string = '';
    pather_completed: string = '';
    pather_pause: string = '';
    pather_members: string = '';
    pather_add: string = '';
    pather_information: string = '';
    pather_profile: string = '';
    pather_security: string = '';
    pather_sitemap: string = '';
    pather_error: string = '';
    pather_privacy: string = '';


    // Textos de la página de projectos
    projects_create: string = '';
    projects_search: string = '';

    // Textos de registro y acceso
    login: string = '';
    register: string = '';
    account: string = '';
    logout: string = '';

    // Textos para la prestaña de cuenta
    account_settings: string = '';
    themes: string = '';
    icons: string = '';
    change_theme: string = '';
    change_icon: string = '';

    //Textos de acciones
    action_cancel: string = '';
    action_save_changes: string = '';
    action_update: string = '';
    action_submit: string = '';

    // Textos para formularios
    user_name: string = '';
    email_address: string = '';
    phone: string = '';
    password: string = '';
    new_user_name: string = '';
    new_email: string = '';
    new_phone: string = '';
    new_password: string = '';
    change_user_name: string = '';
    change_email_address: string = '';
    change_phone: string = '';
    change_password: string = '';
    phone_number: string = ''
    remember: string = '';

    user_validation_messages: { minlength: string, pattern: string, minlength_pattern: string } = { minlength: '', pattern: '', minlength_pattern: '' };
    email_validation_message: { email: string } = { email: '' };
    phone_validation_messages: { minlength: string, pattern: string, minlength_pattern: string } = { minlength: '', pattern: '', minlength_pattern: '' };
    password_validation_messages: { minlength: string, pattern: string, minlength_pattern: string } = { minlength: '', pattern: '', minlength_pattern: '' };

    loading: string = '';

    //
    error_message: string = '';
    back_to_home: string = '';

    //
    activities_search: string = '';
    members_search: string = '';

    options: string = '';
}