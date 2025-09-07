import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (event) {
            const btn = event.target.closest('.btn--inline');

            if (!btn) return;
            const goToPage = Number(btn.dataset.goto);

            handler(goToPage);
        });
    };

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupBtn(curPage, 'next');
        };
        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupBtn(curPage, 'prev');
        };
        // Other page
        if (curPage < numPages) {
            return `${this._generateMarkupBtn(curPage, 'next')}${this._generateMarkupBtn(curPage, 'prev')}`;
        };
        // page 1, and there are no other pages
        return '';
    };

    _generateMarkupBtn(page, pageStatus) {
        const pageToggle = pageStatus === 'next' ? page + 1 : page - 1;
        return `
        <button data-goto="${pageToggle}" class="btn--inline pagination__btn--${pageStatus}">
            ${pageStatus === 'next' ? `<span>Page ${page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            `: `
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg> 
            <span>Page ${page - 1}</span>
            `
            }</button>`;
    };
};

export default new PaginationView();