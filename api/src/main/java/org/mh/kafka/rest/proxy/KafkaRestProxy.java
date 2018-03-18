package org.mh.kafka.rest.proxy;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@EnableConfigurationProperties
@SpringBootApplication
public class KafkaRestProxy {

    @Bean
    @ConditionalOnMissingClass(value = "org.springframework.boot.test.context.SpringBootTest")
    public static BeanFactoryPostProcessor initializeDispatcherServlet() {
        return beanFactory -> {
            BeanDefinition bean = beanFactory.getBeanDefinition(DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME);
            bean.getPropertyValues().add("loadOnStartup", 1);
        };
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(KafkaRestProxy.class, args);
    }
}
