class RemoteImage {
	constructor(content, styles = {}, attributes = {}) {
		this.content = content;
		this.styles = styles;
		this.attributes = attributes;
	}

	createElement() {
		const element = document.createElement('img');
		element.src = this.content.url;

		if (Object.keys(this.styles).length) {
			Object.entries(this.styles).forEach(([key, value]) => {
				element.style[key] = value;
			})
		}

		// const template = document.createElement('template');
		// template.attachShadow({ mode: 'open' })
		//
		// console.log('template: ', template.shadowRoot);

		return element
	}

	getElement() {
		return this.createElement()
	}
}

export default RemoteImage
