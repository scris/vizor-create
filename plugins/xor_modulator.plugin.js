E2.plugins["xor_modulator"] = function(core, node) {
	var self = this;
	
	this.desc = 'Emits true when the values of the two inputs are different and false when they\'re identical.';
	this.input_slots = [ 
		{ name: 'bool', dt: core.datatypes.BOOL, desc: 'The first operand.', def: 'False' },
		{ name: 'bool', dt: core.datatypes.BOOL, desc: 'The second operand.', def: 'False' } 
	];
	
	this.output_slots = [ { name: 'bool', dt: core.datatypes.BOOL, desc: 'Emits true if <b>first</b> does not equal <b>second</b> and false otherwise.', def: 'False' } ];
	
	this.reset = function()
	{
		self.conds = [ false, false ];
		self.state = false;
	};
	
	this.update_input = function(slot, data)
	{
		self.conds[slot.index] = data;
	};	

	this.update_state = function(delta_t)
	{
		self.state = self.conds[0] ? !self.conds[1] : self.conds[1];
	};
	
	this.update_output = function(slot)
	{
		return self.state;
	};	
};
