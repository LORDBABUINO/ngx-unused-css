import { JSDOM } from 'jsdom';
import combine from './combine';
import extractClassesFromNgClass from './extractClassesFromNgClass';

/**
 * Create copy of reference element and add classes passed as a params
 * @param { JSDOM } dom
 * @param { element } e
 * @param { Array<string> } classes
 */
function createCopyOfElementWithClasses(
  dom: JSDOM,
  e: Element,
  classes: string[]
) {
  const el = dom.window.document.createElement(e.tagName);

  e.classList.forEach((c) => el.classList.add(c));
  classes.forEach((c) => el.classList.add(c));
  return el;
}

/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 */
export default function parseNgClass(html: string) {
  const dom = new JSDOM(html);

  const elements = [...dom.window.document.querySelectorAll('[\\[ngclass\\]]')];
  elements.forEach((element) => {
    const classes = extractClassesFromNgClass(
      element.getAttribute('[ngclass]') ?? ''
    );
    element.removeAttribute('[ngclass]');
    const classCombinations = combine(classes);
    const fragment = dom.window.document.createDocumentFragment();
    classCombinations.forEach((classSet) => {
      fragment.appendChild(
        createCopyOfElementWithClasses(dom, element, classSet)
      );
    });
    element.parentNode?.insertBefore(fragment, element.nextSibling);
  });

  return dom.serialize();
}
