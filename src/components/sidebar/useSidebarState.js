import { useDispatch } from "react-redux";
import * as sidebar from "../../redux/actions/sidebarActions";

export default function useSidebarState() {
  const dispatch = useDispatch();

  function openSidebar(state) {
    dispatch(sidebar.openSidebar(state));
  }

  function closeSidebar(state) {
    dispatch(sidebar.closeSidebar(state));
  }

  return [openSidebar, closeSidebar];
}
