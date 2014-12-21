value = "";
sep = "";

function bitCounter($scope) {
	$scope.display = "none";

	$scope.countBits = function() {
		$scope.display = "normal";
		value = $scope.value;
		sep = $scope.separators;
		$scope.bits = buildHistogramm();
		$scope.format = formatValue($scope);

		var unit = "";
		var pat = new RegExp("(0|1)+");

		if (pat.test($scope.value)) {
			unit = "Bit";
		} else {
			unit = "character";
		}

		return $scope.value.length + " - " + unit;
	}
}

function formatValue(sc) {
	var output = [];
	var separatorValues;

	if (typeof sep == "undefined") {
		sc.separators = "4";	
		sep = "4";
	}

	if (sep.indexOf("|") > -1) {
		separatorValues = sep.split("|");
	} else {
		var i;
		var sepparts = value.length - value.length % parseInt(sep);
		for (i = 1; i <= sepparts; i = i + parseInt(sep)) {
			var bound = i-1 + parseInt(sep);
			var str = i == parseInt(bound) ? i : i + " - " + bound;
			output.push({
				number: str,
				values: value.slice(i-1, i-1 + parseInt(sep)).toString()
			});	
		}

		if (sepparts != value.length) {
			bound = value.length;
			str = i == bound ? i : i + " - " + bound;
			output.push({
				number: str,
				values: value.slice(i-1, value.length).toString()
			});	
		}
	}

	return output;
}

function buildHistogramm() {
	var output = [];
	var bits = [];

	for (var i = 0; i < value.length; i++) {
		var next = value.charAt(i);
		if (typeof bits[next] != "undefined") {
			bits[next]++;
		} else {
			bits[next] = 1;
		}
	}

	for (b in bits) {
		if (bits[b] != "undefined") {
			output.push({
				bit: b, count: bits[b]
			});
		}
	}

	return output;

}
