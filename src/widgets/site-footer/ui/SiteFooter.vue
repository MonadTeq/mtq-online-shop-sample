<script lang="ts" setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <div class="site-footer__logo">
          <span>🛍️</span> AcmeTeq
        </div>
        <p class="site-footer__tagline">Quality tech for everyday life.</p>
      </div>

      <div class="site-footer__columns">
        <div class="site-footer__column">
          <h4 class="site-footer__heading">Shop</h4>
          <router-link to="/shop" class="site-footer__link">All products</router-link>
          <router-link to="/shop" class="site-footer__link">New arrivals</router-link>
          <router-link to="/shop" class="site-footer__link">Best sellers</router-link>
        </div>
        <div class="site-footer__column">
          <h4 class="site-footer__heading">Support</h4>
          <a href="#" class="site-footer__link">Help center</a>
          <a href="#" class="site-footer__link">Shipping</a>
          <a href="#" class="site-footer__link">Returns</a>
        </div>
        <div class="site-footer__column">
          <h4 class="site-footer__heading">Company</h4>
          <a href="#" class="site-footer__link">About us</a>
          <a href="#" class="site-footer__link">Careers</a>
          <a href="#" class="site-footer__link">Contact</a>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© {{ year }} AcmeTeq. All rights reserved.</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  background-color: var(--color-surface-default);
  border-top: 1px solid var(--color-border-default);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: var(--space-5);
}

.site-footer__brand {
  flex: 1 1 220px;
}

.site-footer__logo {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.site-footer__tagline {
  margin-top: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
}

.site-footer__columns {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

.site-footer__column {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 140px;
}

.site-footer__heading {
  margin: 0 0 var(--space-1);
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
}

.site-footer__link {
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);

  &:hover {
    color: var(--color-action-primary);
  }
}

.site-footer__bottom {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border-default);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
