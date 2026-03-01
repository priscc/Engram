<template>
	<b-row
		class="page_header_row"
		:class="{ 'has-image': Boolean(backgroundImage), 'neutral-bg': !backgroundImage }"
		:style="headerStyle"
	>
		<b-col cols="12" class="page_header_content">
			<div class="page_header_inner">
				<button type="button" class="header_back_button" @click="handleBack">
					<b-icon-chevron-left aria-hidden="true" /> Back
				</button>
				<div class="header_breadcrumb" role="heading" aria-level="1">
					<span
						v-for="(item, index) in breadcrumbItems"
						:key="`crumb-group-${index}`"
						class="crumb_group"
					>
						<span class="crumb_item" :class="{ crumb_current: item.current }">
							{{ item.label }}
						</span>
						<span
							v-if="index < breadcrumbItems.length - 1"
							class="crumb_sep"
							aria-hidden="true"
						>
							→
						</span>
					</span>
				</div>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import { pushRoute } from "@/router/navigation";

export default {
	name: "TopicHeader",
	emits: ["back"],
	props: {
		backgroundImage: {
			type: String,
			default: ""
		},
		breadcrumbs: {
			type: Array,
			default: () => []
		},
		backRoute: {
			type: [String, Object],
			default: null
		},
		title: {
			type: String,
			default: ""
		}
	},
	computed: {
		headerStyle() {
			if (!this.backgroundImage) {
				return {};
			}
			return {
				backgroundImage: `url(${this.backgroundImage})`
			};
		},
		breadcrumbItems() {
			const items = (this.breadcrumbs || [])
				.filter(Boolean)
				.map(item => {
					if (typeof item === "string") {
						return { label: item };
					}
					return {
						label: item?.label || ""
					};
				})
				.filter(item => item.label);

			if (this.title) {
				items.push({ label: this.title });
			}

			return items.map((item, index) => ({
				...item,
				current: index === items.length - 1
			}));
		}
	},
	methods: {
		handleBack() {
			this.$emit("back");

			if (!this.backRoute) {
				return;
			}

			if (typeof this.backRoute === "string") {
				pushRoute(this.backRoute);
				return;
			}

			const routeName = this.backRoute?.name;
			const params = this.backRoute?.params;
			if (routeName) {
				pushRoute(routeName, params);
			}
		}
	}
};
</script>

<style lang="sass" scoped>
.page_header_row
	min-height: 132px
	padding: 16px 22px
	position: relative
	overflow: hidden

.page_header_row.has-image
	background-size: cover
	background-position: right 15% bottom 52%

.page_header_row.has-image::after
	-webkit-backdrop-filter: blur(5px)
	backdrop-filter: brightness(50%)
	content: ""
	display: block
	position: absolute
	width: 100%
	height: 100%
	top: 0
	left: 0

.page_header_row.neutral-bg
	background: #34353a

.page_header_content
	position: relative
	z-index: 1

.page_header_inner
	min-height: 100px
	width: 100%
	display: flex
	align-items: center
	gap: 14px

.header_back_button
	display: inline-flex
	align-items: center
	gap: 6px
	padding: 6px 14px
	font-family: "Montserrat", sans-serif
	font-weight: 700
	font-size: 14px
	color: #fff
	background: rgba(91, 33, 182, 0.4)
	border: 1px solid rgba(91, 33, 182, 1)
	border-radius: 10px
	backdrop-filter: blur(6px)
	text-decoration: none
	cursor: pointer
	transition: all 0.25s ease

.header_back_button:hover
	background: #5B21B6
	transform: translateY(-1px)

.header_back_button:active
	transform: translateY(0)

.header_breadcrumb
	display: flex
	align-items: center
	flex-wrap: wrap
	gap: 6px
	min-width: 0
	color: #ffffff
	font-family: "Montserrat", sans-serif
	letter-spacing: -0.4px
	font-size: 22px
	line-height: 1.2
	font-weight: 500

.crumb_group
	display: inline-flex
	align-items: center
	gap: 6px

.crumb_item
	max-width: 100%
	word-break: break-word

.crumb_current
	font-weight: 700

.crumb_sep
	color: rgba(255, 255, 255, 0.82)
	font-size: 20px
	line-height: 1

@media (max-width: 920px)
	.page_header_row
		min-height: 124px
		padding: 14px 14px

	.page_header_inner
		gap: 10px

	.header_breadcrumb
		font-size: 18px

@media (max-width: 576px)
	.page_header_inner
		align-items: flex-start
		flex-direction: column
		justify-content: center

	.header_back_button
		padding: 5px 10px
		font-size: 13px

	.header_breadcrumb
		font-size: 16px
		gap: 4px
</style>
