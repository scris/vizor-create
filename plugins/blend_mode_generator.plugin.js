E2.plugins["blend_mode_generator"] = function(core, node) {
	var self = this;
	
	this.desc = 'Select blend mode.';
	this.input_slots = [];
	this.output_slots = [ { name: 'blend mode', dt: core.datatypes.FLOAT, desc: 'Emits the selected blend mode when requested or the selection state changes.', def: 'Normal' } ];
	this.state = { mode: Renderer.blend_mode.NORMAL };
	this.changed = true;
		
	this.reset = function()
	{
		self.updated = true;
	};
	
	this.create_ui = function()
	{
		var bm = Renderer.blend_mode;
		var items = {
			None: bm.NONE,
			Additive: bm.ADDITIVE,
			Subtractive: bm.SUBTRACTIVE,
			Multiply: bm.MULTIPLY,
			Normal: bm.NORMAL
		};
		var inp = $('<select />', { selectedIndex: 4 });
		
		$('<option />', { value: bm.NONE, text: 'None' }).appendTo(inp);
		$('<option />', { value: bm.ADDITIVE, text: 'Add' }).appendTo(inp);
		$('<option />', { value: bm.SUBTRACTIVE, text: 'Sub' }).appendTo(inp);
		$('<option />', { value: bm.MULTIPLY, text: 'Mul' }).appendTo(inp);
		$('<option />', { value: bm.NORMAL, text: 'Normal' }).appendTo(inp);
		 
		inp.change(function() 
		{
			self.state.mode = parseInt(inp.val());
			self.state_changed(inp);
			self.changed = true;
		});
		
		return inp;
	};
	
	this.update_state = function(delta_t)
	{
		if(self.changed)
		{
			self.changed = false;
			self.updated = true;
		}
	};
	
	this.update_output = function(slot)
	{
		return self.state.mode;
	};
	
	this.state_changed = function(ui)
	{
		if(ui)
			ui.val('' + self.state.mode);
	};
};
