AFRAME.registerComponent("clickhandler", {
		init: function() {	
			this.el.addEventListener("click", function(evt) {
				let icon = evt.target || evt.srcElement;
				let index = parseInt(icon.getAttribute("id"));
				let panel = parent.document.getElementById("info-panel");
				let el = parent.db.location[index];
				panel.innerHTML = "";
				let backBtn = parent.document.createElement("button");
				backBtn.setAttribute("class", "button close");
				backBtn.setAttribute("onClick", "btnClose()");
				panel.appendChild(backBtn);

				let name = parent.document.createElement("h1");
				name.innerHTML = el.name;
				panel.appendChild(name);
				let title = parent.document.createElement("h2");
				title.innerHTML = el.name;
				let content = parent.document.createElement("div");
				content.innerHTML = el.desc;
				panel.appendChild(title);
				panel.appendChild(content);
				
				parent.displayInfoPanel();
			});
		}
});