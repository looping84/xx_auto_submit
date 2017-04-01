
var url = window.location.href
var apiUrl = "http://dev.xxzhushou.cn/developer/XXTouchAssistInformation.php"

console.log('loading content script')
main()
function main() {
	console.log('当前 url',url)
	if (url.indexOf("dev.xxzhushou.cn/versionList.html") == -1) {
		return ;
	}
	check()
	setInterval(check, 15 * 1000)
}
function check(){
	var pid = getParameterByName("pid",url)

	getList(pid,function(data){
		if (data.status == "2" || data.status == "0") {//已审核 或者提交审核
			submitCheck(data)
		}
	})
}

function getList(pid,cb) {
	return $.ajax({
		url: apiUrl,
		type: 'get',
		dataType:"json",
		data: {
			pid: pid,
			request:4,
			start: 1
		}
	}).done(function(res){

		if (!res.data || !res.data.version_arr) {
			return null
		}
		console.log(res.data.version_arr[0])
		// 返回第一条数据
		cb && cb ( res.data.version_arr[0])
	})
}
function submitCheck(firstItem) {
	if (!firstItem) {
		return;
	}
	console.log('submitCheck')
	// 提交审核
	$.ajax({
		url: apiUrl,
		type: 'post',
		data: {
			request:5,
			file_id: firstItem.file_id,
            status: firstItem.status
		}
	}).done(function(res){
		console.log(res)
		window.location.reload()
	})
}
function getParameterByName( name,href ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}