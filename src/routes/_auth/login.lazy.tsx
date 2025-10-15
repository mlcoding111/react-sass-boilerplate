import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'
export const Route = createLazyFileRoute('/_auth/login')({
    component: Login,
})

function Login(){
    return <div><LoginForm /></div>
}
