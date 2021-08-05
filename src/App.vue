<script>
	export default {
		// 应用的生命周期三个onLaunch:应用启动时候触发
		onLaunch: function() {
			console.log('App Launch 应用启动')
		},
		onShow: function() {
			console.log('App Show 应用显示')
		},
		onHide: function() {
			console.log('App Hide 应用隐藏')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './styles/iconfont.wxss';
	@import './styles/base.wxss';
</style>
