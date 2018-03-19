<template>
    <div>
        survey page id = {{pid}}
    </div>
</template>
<script>
export default{
    data() {
        return {
            pid: this.$router.query.id
        }
    }
}
</script>
