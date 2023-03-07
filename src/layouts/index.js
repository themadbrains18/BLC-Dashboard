import DashboardLayout from "./dashboardLayout"


const Layouts = (Component) => (props) => {

        return (<DashboardLayout pageContent={<Component {...props} />} />)
}
export default Layouts;