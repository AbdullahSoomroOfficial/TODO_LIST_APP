export const cardString = `<div class="card text-bg-primary mb-4" style="max-width: 18rem;">
                <div class="card-header">
                <div class="row">
                    <div class="col"></div>
                    <div class="col text-end">
                    <i class="fa-solid fa-pen-to-square mx-3"></i>
                    <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title border-bottom mb-3"></h5>
                    <p class="card-text"></p>
                </div>
             </div>`



export function convertStringToHTML(str, id) {
    const parser = new DOMParser();
    const parsedString = parser.parseFromString(str, 'text/html');
    parsedString.body.firstChild.setAttribute('id',id);
    return parsedString.body.firstChild;
}