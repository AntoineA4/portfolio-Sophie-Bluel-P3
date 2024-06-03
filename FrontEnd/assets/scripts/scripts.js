import { bindLoginForm } from "./components/auth-component.js";
import { createCategoriesContainer} from "./components/category-component.js";
import { bindCreateWorkModal, createWorksContainer } from "./components/work-component.js";
import { findAllWorks } from "./services/work-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    const works = await findAllWorks ();
    await createCategoriesContainer();
    await createWorksContainer(works);
    await bindLoginForm();
    bindCreateWorkModal();
});





