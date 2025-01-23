'use client'
import { useAuth } from "react-oidc-context";

export default function Home() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "<client_id>";
        const logoutUri = "http://localhost:3000"
        const cognitoDomain = "https://<domain_prefix>.auth.ap-northeast-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <main>
                <p> Hello: {auth.user?.profile.email} </p>
                <p> Hello: {JSON.stringify(auth.user?.profile)} </p>
                <p> ID Token: {auth.user?.id_token} </p>
                <p> Access Token: {auth.user?.access_token} </p>
                <p> Refresh Token: {auth.user?.refresh_token} </p>

                <button onClick={() => {
                    auth.removeUser()
                    signOutRedirect()
                }}>Sign out</button>
            </main>
        );
    }

    return (
        <main>
            <button onClick={() => auth.signinRedirect({
                extraQueryParams: {
                    current: "123",
                }
            })}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </main >
    );
}
