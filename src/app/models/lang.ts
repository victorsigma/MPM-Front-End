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

    user_validation_messages: { minlength: string, pattern: string, minlength_pattern: string, matchfields: string } = { minlength: '', pattern: '', minlength_pattern: '', matchfields: '' };
    email_validation_message: { email: string, matchfields: string } = { email: '', matchfields: '' };
    phone_validation_messages: { minlength: string, pattern: string, minlength_pattern: string, matchfields: string } = { minlength: '', pattern: '', minlength_pattern: '', matchfields: '' };
    password_validation_messages: { minlength: string, pattern: string, minlength_pattern: string, matchfields: string } = { minlength: '', pattern: '', minlength_pattern: '', matchfields: '' };

    loading: string = '';

    //
    error_message: string = '';
    back_to_home: string = '';

    //
    activities_search: string = '';
    members_search: string = '';

    options: string = '';

    password_lost: string = '';

    password_recovery: { request: string, reset: string, text: string } = { request: '', reset: '', text: '' };

    submit: string = '';

    verify_account: string = '';
    verify_status: { inprocess: string, error: string, completed: string } ={ inprocess: '', error: '', completed: '' };
    verify_email: string = '';
    verified: string = '';

    project_options: string = '';
    change_project_name: string = '';
    change_description: string = '';
    start_date: string = '';
    completion_date: string = '';
    actual_date: string = '';

    create_project: string = '';
    project_name: string = '';
    project_description: string = '';

    add_activity: string = '';
    activity_name: string = '';
    description_activity: string = '';
    status: string = '';
    participating_roles: string = '';
    analyst: string = '';
    designer: string = '';
    programmer: string = '';
    leader: string = '';

    change_activity_name: string = '';
    change_status: string = '';

    enter: string = '';
    select_rol: string = '';

    member: string = '';
    remove: string = '';
    change_rol: string = '';
    update_member: string = '';

    mpm_description_1: string = '';
    mpm_description_2: string = '';
    mpm_description_3: string = '';
    mpm_description_4: string = '';
    mpm_description_5: string = '';
    mpm_description_6: string = '';
    mpm_description_7: string = '';
    mpm_description_8: string = '';

    tag_error: string = '';

    strong_1: string = '';
    strong_2: string = '';
    strong_3: string = '';

    search: string = '';
    toast: {
        register_ok: string,
        register_error: string,
        login_error: string,
        project_add_ok: string,
        project_add_error: string,
        activity_add_ok: string,
        activity_add_error: string,
        member_add_ok: string,
        member_add_error: string,
        verify_accont_ok: string,
        verify_accont_error: string,
        recovery_email_ok: string,
        update_ok: string,
        update_error: string,
        delete_ok: string,
        delete_error: string,
        status_cancel: string,
        status_complited: string,
        capcha: string,
    } = {
        register_ok: '',
        register_error: '',
        login_error: '',
        project_add_ok: '',
        project_add_error: '',
        activity_add_ok: '',
        activity_add_error: '',
        member_add_ok: '',
        member_add_error: '',
        verify_accont_ok: '',
        verify_accont_error: '',
        recovery_email_ok: '',
        update_ok: '',
        update_error: '',
        delete_ok: '',
        delete_error: '',
        status_cancel: '',
        status_complited: '',
        capcha: ''
    }
}