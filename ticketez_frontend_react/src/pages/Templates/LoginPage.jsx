// import { useTranslation } from 'react-i18next';
import LoginForm from '@app/components/auth/LoginForm';
// import PageTitle from '@app/components/common/PageTitle/PageTitle';

const LoginPage = () => {
    // const { t } = useTranslation();

    return (
        <>
            {/* <PageTitle>{t('common.login')}</PageTitle> */}
            <LoginForm />
        </>
    );
};

export default LoginPage;
