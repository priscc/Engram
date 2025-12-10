
Need to updated the URLS to be more reabable for SEO and humans

## Current URL Structure
Period/<periodSlug>/<<periodNumber>/Topic/<topicSlug>/<topicId>/<category>/<category>/<itemId>
# example:
http://localhost:8080/Period/Regional%20Interactions/1/Topic/China/htcRPWK35AVdGb0Tx7pd/Events/Event/6IGDpLc7cNx0kEoLbX80


## Updated URL Structure
/ap-world-history/period/<periodSlug>-<periodNumber>/topic/<topicSlug>-<topicId>/<category>/<itemSlug>-<itemId>

# example:
http://localhost:8080/ap-world-history/period/regional-interactions-1/topic/china-htcRPWK35AVdGb0Tx7pd/events/zhu-yuan-zhang-6IGDpLc7cNx0kEoLbX80


URLs that need to be update:
- ✅ units (all time periods)
- Topics
- Topic
- Events
- People Historical Figures 



-------- 
After updating URLS 
- (1) move all router js into a file?
- (2) create a file with a scheme of the firestore database
- (3) make search bar work