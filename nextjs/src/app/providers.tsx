'use client'
import { AuthProvider, AuthProviderProps } from "react-oidc-context";


const cognitoAuthConfig: AuthProviderProps = {
    authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/<user_pool_id>",
    client_id: "<client_id>",
    redirect_uri: "http://localhost:3000/auth/callback",
    response_type: "code",
    scope: "openid",
    // matchSignoutCallback: function (args) {
    //     return window && (window.location.href === args.post_logout_redirect_uri);
    // },
    // onSigninCallback: function (resp) {
    //     window.location.pathname = ""
    // },
    // onRemoveUser: function () {
    //     window.location.pathname = ""
    // },
};


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider {...cognitoAuthConfig}>
            {children}
        </AuthProvider>
    );
}