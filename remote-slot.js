import RemoteImage from './remote-image'
import RemoteText from './remote-text'

class RemoteSlot {
	constructor(data) {
		this.data = data;
		this.element = this.findSelfAsElement();

		this.init();
	}

	findSelfAsElement() {
		return document.querySelector(`[remote-id="${this.data.id}"]`);
	}

	init() {
		if (!this.data && !this.element) {
			throw new Error(`RemoteSlot can't find data`)
		}

		const elementTypeMap = {
			TEXT: RemoteText,
			IMAGE: RemoteImage
		};

		const component = new elementTypeMap[this.data.type](this.data.content, this.data.styles, this.data.attributes);
		this.element.attachShadow({ mode: 'open' })
		this.element.shadowRoot.appendChild(component.getElement())
	}
}

export default RemoteSlot

// class RemoteSlot extends HTMLElement {
// 	constructor() {
// 		super();
// 		this.attachShadow({ mode: 'open' });
// 	}
//
// 	connectedCallback() {
// 		const data = this.attributes.getNamedItem('data');
//
// 		if (!data) {
// 			this.shadowRoot.innerHTML = `<div>[no data]</div>`;
// 			return;
// 		}
//
// 		const value = JSON.parse(data.value);
// 		// Create web component with name from value.type and fields from data.content
// 		// TODO: apply "DRY" to code below
// 		const elementTypeMap = {
// 			TEXT: 'remote-text',
// 			IMAGE: 'remote-image'
// 		};
// 		const component = document.createElement(elementTypeMap[value.type]);
//
// 		const fields = value.content;
//
// 		Object.entries(fields).forEach(([key, value]) => {
// 			component.setAttribute(key, value);
// 		});
//
// 		this.shadowRoot.appendChild(component);
// 	}
// }
//
// customElements.define('remote-slot', RemoteSlot);
