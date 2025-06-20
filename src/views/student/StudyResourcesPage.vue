<template>
  <div class="study-resources-page">
    <!-- 左侧内容区 -->
    <div class="left-content">
      <!-- 搜索框 -->
      <div class="search-container">
        <SearchBox placeholder="输入课程名、知识点、关键词" />
      </div>

      <!-- 知识图谱 -->
      <div class="graph-container" id="container"></div>

      <!-- 按钮组
      <div class="button-group">
        <button class="action-button">智能推荐</button>
        <button class="action-button">关联资料</button>
        <button class="action-button">历史学习</button>
      </div> -->
    </div>

    <!-- 右侧资源卡片 -->
    <div class="right-content">
      <div class="resource-card">
        <div class="card-header">
          <h2 class="resource-title">学习资源</h2>
          <div class="category-section">
            <div class="categories">
              <button class="category-tag">计算机视觉</button>
              <button class="category-tag">深度学习</button>
              <button class="category-tag">机器学习</button>
            </div>
            <div class="dropdown-button">
              <img src="@/assets/icons/down-sque.svg" v-if="isDropdownOpen" alt="下拉" />
              <!-- <img src="@/assets/icons/up-sque.svg" v-else alt="下拉" /> -->
            </div>
          </div>
        </div>

        <div class="resource-item">
          <div class="resource-cover">
            <img src="@/assets/paper.jpg" alt="资源封面" />
          </div>
          <div class="resource-info">
            <h3 class="resource-name">
              The NumPy Array: A Structure for Efficient Numerical Computation
            </h3>
            <span class="resource-type">朱泳全</span>
            <div class="resource-meta">
              <p class="resource-description">
                NumPy数组是Python世界中数值数据的标准表示形式。本文介绍了如何使用NumPy数组在高级语言中实现高效的数值计算。总体而言，有三种技术可以提高性能：向量化计算、避免在内存中复制数据以及最小化操作次数。文章首先介绍了NumPy数组结构，然后展示了如何使用它进行高效的计算，最后介绍了如何与其他库共享数组数据。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Graph, treeToGraphData } from '@antv/g6'
import SearchBox from '@/components/SearchBox.vue'
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

onMounted(() => {
  // 初始化知识图谱
  fetch('https://assets.antv.antgroup.com/g6/flare.json')
    .then((res) => res.json())
    .then((data) => {
      const graph = new Graph({
        container: 'container',
        autoFit: 'view',
        padding: 50,
        data: treeToGraphData(data),
        node: {
          style: {
            size: 12,
            labelText: (d) => d.id,
            labelBackground: true,
            labelFontSize: 14,
            labelFontFamily: 'Gill Sans',
          },
        },
        edge: {
          type: 'cubic-radial',
          style: {
            lineWidth: 3,
          },
        },
        layout: {
          type: 'compact-box',
          radial: true,
          direction: 'RL',
          getVGap: () => 40,
          getHGap: () => 80,
          preLayout: false,
        },
        behaviors: [
          'drag-canvas',
          'zoom-canvas',
          'drag-element',
          {
            key: 'hover-activate',
            type: 'hover-activate',
            degree: 5,
            direction: 'in',
            inactiveState: 'inactive',
          },
        ],
        transforms: ['place-radial-labels'],
        animation: false,
      })

      graph.render()
    })

  // fetch('/assets/aa.json')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const nodes = data.nodes
  //     // randomize the node size
  //     nodes.forEach((node) => {
  //       node.size = Math.random() * 30 + 5
  //     })

  //     const graph = new Graph({
  //       container: 'container',
  //       autoFit: 'center',
  //       data,
  //       node: {
  //         style: {
  //           size: (d) => d.size,
  //           lineWidth: 1,
  //         },
  //       },
  //       layout: {
  //         type: 'd3-force',
  //         collide: {
  //           // Prevent nodes from overlapping by specifying a collision radius for each node.
  //           radius: (d) => d.size / 2,
  //         },
  //       },
  //       behaviors: ['drag-element-force'],
  //     })

  //     graph.render()
  //   })
})
</script>

<style scoped>
.study-resources-page {
  display: flex;
  height: 85vh;
  background-color: #f5f7fa;
  /* padding: 2rem; */
  gap: 2rem;
  margin: 0;
}

/* 左侧内容区样式 */
.left-content {
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 1.5rem;
  height: 100%;
}

/* 搜索框容器 */
.search-container {
  display: flex;
  align-items: center;
  /* background-color: #ffffff; */
  border-radius: 8px;
  /* padding: 0 1rem; */
  margin: 30px 20px 20px 50px;
  height: 3rem;
  width: 400px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
  position: relative;
}

.search-icon-left {
  margin-right: 0.75rem;
}

.search-icon-right {
  margin-left: 0.75rem;
  cursor: pointer;
}

.search-icon-left img,
.search-icon-right img {
  width: 20px;
  height: 20px;
}

/* 图谱容器 */
.graph-container {
  flex: 1;
  background-color: #f5f7fa;
  border-radius: 10px;
  /* box-shadow: 0 2px 8px rgb(0, 0, 0); */
  overflow: hidden;
  margin: 0 20px;
  width: 100%;
  height: 100%;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #333333;
}

/* 右侧内容区样式 */
.right-content {
  width: auto;
  margin-top: 20px;
  width: 60%;
}

.resource-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}

.card-header {
  margin-bottom: 1.5rem;
}

.resource-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.category-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categories {
  display: flex;
  gap: 0.75rem;
  margin-left: 2%;
}

.category-tag {
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 0.4rem 0.75rem;
  border-radius: 30px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: bolder;
  border: 1px solid #d1d1d1;
}

.dropdown-button {
  cursor: pointer;
}

.dropdown-button img {
  width: 20px;
  height: 20px;
}

/* 资源项 */
.resource-item {
  display: flex;
  gap: 0.7rem;
  background-color: #f5f7fa;
  border-radius: 15px;
  padding: 1rem 1.5rem;
  height: 150px;
  width: 93%;
  margin-left: 2%;
}

.resource-item:hover {
  background-color: rgb(238, 241, 244);
}

.resource-cover {
  width: 120px;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.resource-cover img {
  width: 100%;
  height: 120px;
  width: 100px;
  object-fit: cover;
  border: 1px solid #dedede;
  border-radius: 10px;
}

.resource-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-overflow: ellipsis;
}

.resource-name {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: -5px;
  /* margin-bottom: 0.5rem; */
}

.resource-type {
  display: inline-block;
  /* background-color: #cccccc; */
  color: #8b8b8b;
  font-family: 'Noto Serif SC', serif;
  font-size: 15px;
  font-weight: 500;
  /* padding: 0.25rem 0.5rem; */
  /* border-radius: 4px; */
  /* margin-bottom: 0.5rem; */
}

.resource-meta {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-overflow: ellipsis;
  /* gap: 0.75rem; */
}

.resource-description {
  font-family: 'Noto Serif SC', serif;
  font-size: 15px;
  color: #64635f;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  margin-top: 0px;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
